import { BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";
import { validateOrReject } from "class-validator";

class ExtendBaseEntity extends BaseEntity {

    @BeforeInsert()
    async validateOnInsert() {
        await validateOrReject(this);

    }

    @BeforeUpdate()
    async validateOnUpdate() {
        await validateOrReject(this, { skipMissingProperties: true});

    
    }   
}
export default ExtendBaseEntity;