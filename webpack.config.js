module.exports = function (options, webpack) {
      const lazyImports = [
    '@nestjs/microservices',
    '@nestjs/websockets',
    'cache-manager',
    'class-validator',
    'class-transformer',
    // Agrega otros módulos que quieres ignorar aquí
      ];
    
  return {
    ...options,
    entry: ['./src/lambda/index.ts'],
    externals: [],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          // Ignoring non-essential modules for Lambda deployment
          return lazyImports.includes(resource);
        },
      }),
    ],
  };
};