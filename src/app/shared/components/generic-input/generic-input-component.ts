import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * ESTE COMPONENTE SERVE APENAS PARA SER HERDADO POR OUTROS,
 * NUNCA DEVE SER USADO ISOLADAMENTE OU ENCAPSULADO EM UM MÓDULO!
 */
@Component({ template: '' })
export class GenericInputComponent<T> {

  // Valor inicial do input
  @Input()
  public initialValue: any;

  // FormControl para controlar o input externamente
  @Input()
  public control = new FormControl();

  // Estilos a serem aplicados diretamente no input
  @Input()
  public deep = '';

  // Classes a serem aplicadas diretamente no contêiner do input
  @Input()
  public classes = '';

  // Evento disparado quando um alguma ação que indique "conclusão" acontece no input
  @Output()
  public submit = new EventEmitter<T>();

}
