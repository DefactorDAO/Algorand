import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default (app) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Algorand PoC')
    .setDescription('Algorand PoC')
    .setVersion(process.env.npm_package_version)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
};
