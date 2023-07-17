import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import * as braintree from 'braintree-web';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  hostedFieldsInstance: any;
  userForm!: FormGroup; // Declare the userForm as FormGroup

  constructor(private fb: FormBuilder) {
    // Initialize the userForm FormGroup with form controls and validators
    this.userForm = this.fb.group({
      number: ['', Validators.required], // 'number' form control with required validator
      cvv: ['', Validators.required], // 'cvv' form control with required validator
      date: ['', Validators.required], // 'date' form control with required validator
      postal: ['', Validators.required] // 'postal' form control with required validator
    });
  }

  ngOnInit() {
    // Create a Braintree client instance
    braintree.client.create({
      authorization: 'sandbox_ktrgxjd6_82chy3ymnrssc2d2'
    }).then((clientInstance) => {
      this.initializeHostedFields(clientInstance);
    }).catch((error) => {
      console.error(error);
    });
  }

  initializeHostedFields(clientInstance: any) {
    // Create Braintree hosted fields with client instance and configuration
    braintree.hostedFields.create({
      client: clientInstance,
      styles: {
        input: {
          'font-size': '14px',
          'font-family': 'helvetica, tahoma, calibri, sans-serif',
          'color': '#3a3a3a'
        },
        ':focus': {
          'color': 'black'
        }
      },
      fields: {
        number: {
          selector: '#card-number',
          placeholder: '1000 1000 1000 1000'
        },
        cvv: {
          selector: '#cvv',
          placeholder: '000'
        },
        expirationDate: {
          selector: '#expiration-date',
          placeholder: '07/24'
        },
        postalCode: {
          selector: '#postal-code',
          placeholder: 'L1L1L1'
        }
      }
    }).then((hostedFieldsInstance) => {
      this.hostedFieldsInstance = hostedFieldsInstance;
    }).catch((error) => {
      console.error(error);
    });
  }

  messages: Message[] | undefined;

  addMessages() {
    // Add messages to be displayed
    this.messages = [
      { severity: 'success', summary: 'Success', detail: 'Message Content' },
      { severity: 'info', summary: 'Info', detail: 'Message Content' },
      { severity: 'warn', summary: 'Warning', detail: 'Message Content' },
      { severity: 'error', summary: 'Error', detail: 'Message Content' }
    ];
  }

  processPayment() {
    // Tokenize the hosted fields data and handle the payment process
    this.hostedFieldsInstance.tokenize()
      .then((payload: any) => {
        console.log(payload);
      })
      .catch((error: braintree.BraintreeError) => {
        console.error(error);
      });
  }
}
