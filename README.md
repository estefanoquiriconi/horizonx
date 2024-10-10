# Continuación del proyecto - Personal

npm install
cp .env.example .env
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev

NODE_ENV=test npx sequelize-cli db:migrate