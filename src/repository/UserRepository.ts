import {
  EntityRepository,
  AbstractRepository,
  getCustomRepository,
} from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  createUserAndSave(userEntity: User) {
    const user = this.repository.create(userEntity);

    return user.save();
  }

  updateUser({ id, firstName, lastName }: User) {
    return this.repository.update(id, { firstName, lastName });
  }

  deleteUser({ id }: User) {
    return this.repository.delete(id);
  }

  getAllusers() {
    const user = this.repository.find();

    return user;
  }

  findById({ id }: User) {
    const user = this.repository.findOne(id);

    return user;
  }
}

export const getUserRepository = (): UserRepository => {
  const userRepository = getCustomRepository(UserRepository);
  return userRepository;
};
