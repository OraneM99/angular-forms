import { Component, signal } from '@angular/core';
import { RegisterData } from '../../../shared/models/register-data.model';
import { email, form, FormField, max, min, minLength, pattern, required } from '@angular/forms/signals';

@Component({
  selector: 'app-register-form',
  imports: [FormField],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterFormComponent {
  registerModel = signal<RegisterData>({
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    password: '',
  });

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.firstName, { message: 'Le prénom est obligatoire' });
    required(schemaPath.lastName, { message: 'Le nom est obligatoire' });
    required(schemaPath.age, { message: "L'âge est obligatoire" });
    required(schemaPath.email, { message: "L'email est obligatoire" });
    required(schemaPath.password, { message: 'Le mot de passe est obligatoire' });

    email(schemaPath.email, { message: 'Email invalide.' });
    minLength(schemaPath.password, 8, { message: 'Le mot de passe doit contenir au moins 8 caractères' });
    pattern(schemaPath.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, { 
      message : 'Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial'
    });
    min(schemaPath.age, 18, { message: "L'âge doit être supérieur ou égal à 18 ans" });
    max(schemaPath.age, 120, { message: "L'âge ne doit pas être supérieur à 120 ans" });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (!this.registerForm().valid()) {
      return;
    }

    const { password, ...safeData } = this.registerModel();
    console.log({ ...safeData, password: '*******' });
  }
}