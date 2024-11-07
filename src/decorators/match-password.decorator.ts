import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'MatchPassword', async: false })
  export class MatchPassword implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      const confirmPassword = (args.object as any)[relatedPropertyName];
      return password === confirmPassword;
    }
  
    defaultMessage(args: ValidationArguments) {
        if(false) console.log(args);
      return 'El password y la confirmación no coinciden';
    }
  }