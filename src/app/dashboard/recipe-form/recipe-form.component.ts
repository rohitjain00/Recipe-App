import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../model/ingredient';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  recipeForm: FormGroup;
  productForm: FormGroup;

  ngOnInit() {
    this.recipeForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: this.formBuilder.array([this.formBuilder.group({name: '', quantity: ''})]),
    instructions: this.formBuilder.array([this.formBuilder.group({instruction: ''})])
  });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
  }
  get recipeInstructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addInstruction() {
    this.recipeInstructions.push(this.formBuilder.group({instruction: ''}));
  }
  deleteInstruction(index) {
    this.recipeInstructions.removeAt(index);
  }

  get recipeIngredient() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.recipeIngredient.push(this.formBuilder.group({name: '', quantity: ''}));
  }
  deleteIngredient(index) {
    this.recipeIngredient.removeAt(index);
  }

}
