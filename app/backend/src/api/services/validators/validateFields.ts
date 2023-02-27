import BadRequest from '../../errors/BadRequest';
import idSchema from './schema';

const validateId = (id: (string | number)) => {
  const { error } = idSchema.validate(id);
  if (error) throw new BadRequest(error.message);
};

export default validateId;
