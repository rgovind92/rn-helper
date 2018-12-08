import { normalize, schema } from 'normalizr';

// TODO: Normalize in server
const childSchema = new schema.Entity('childMenuItems', undefined, {
  idAttribute: 'code'
});

const parentSchema = new schema.Entity('parentMenuItems',
  {
    menu: [childSchema]
  },
  {
    idAttribute: 'code'
  });

export default input => {
  return normalize(input, [parentSchema]);
};
