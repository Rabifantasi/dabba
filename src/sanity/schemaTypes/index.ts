import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import header from './header'
import footer from './footer'
import hero from './hero'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product , header , footer , hero],
}
