import { env } from './env';
import { app } from './app';

app.listen(env.PORT, () => {
  console.log(`SkillMatch API listening on http://localhost:${env.PORT}`);
});
