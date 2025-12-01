import Role from "../models/role.js"

export async function getEffectivePermissions(user) {
  const roleDocs = await Role.find({ name: { $in: user.roles } });
  const roleMap = new Map(roleDocs.map(r => [r.name,r]));

  const visited = new Set();
  const stack = [...roleDocs];
  const perms = new Set(user.overrides || []);

  while (stack.length) {
    const role = stack.pop();
    if (!role || visited.has(role.name)) continue;

    visited.add(role.name);

    (role.permissions || []).forEach(p => perms.add(p))
    ;
    (role.inherits || []).forEach(rn => {
      const inherited = roleMap.get(rn);
      if (inherited) stack.push(inherited);
    });
  }
  return perms;
}

export function requirePermissions (...needed) {
  return async (req, res, next) => {
    try {
      const user = req.user; // set by your auth middleware
      if (!user) return res.status(401).json({ error: 'unauthenticated' });

      const perms = await getEffectivePermissions(user);
      const ok = needed.every(p => perms.has(p));

      if (!ok) {
        return res.status(403).json({
          error: 'forbidden',
          missing: needed.filter(p => !perms.has(p)) 
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}
