if (!Bun.env.JWT_SECRET) {
  throw new Error("Missing environment variable: `JWT_SECRET`");
}

export default {
  JWT_SECRET: Bun.env.JWT_SECRET,
};
