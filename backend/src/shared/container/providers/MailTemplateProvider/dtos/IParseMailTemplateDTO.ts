interface ITemplateVariables {
  // this [key: string] in square brackets means that the name of the attribute
  // could be anything as long as it is a string. It is a way to declare generic attributes.
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}
