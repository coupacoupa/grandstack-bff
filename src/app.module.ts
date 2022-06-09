import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { MovieModule } from './domain/nodes/movie/movie.module';
import { PersonModule } from './domain/nodes/person/person.module';
import { PersonMovieRelationModule } from './domain/relations/person-movie-relation/person-movie-relation.module';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
    Neo4jModule.forRootAsync(),
    MovieModule,
    PersonModule,
    PersonMovieRelationModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
