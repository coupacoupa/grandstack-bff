import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { Neo4jModule } from './neo4j/neo4j.module';
import neo4j from 'neo4j-driver';
import { typeDefs } from './schema/typeDef';

const driver = neo4j.driver(
  'neo4j+s://8b16cd23.databases.neo4j.io:7687',
  neo4j.auth.basic('neo4j', 'M8JlX_cCGhKFcxqV0l4AyCuKf74fSHCZ1m4y4AOtMng'),
);
const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => {
        const schema = await neoSchema.getSchema();
        await neoSchema.assertIndexesAndConstraints({
          options: { create: true },
        });
        console.log(schema);
        return {
          playground: true,
          schema,
        };
      },
    }),
    Neo4jModule.forRootAsync(),
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
