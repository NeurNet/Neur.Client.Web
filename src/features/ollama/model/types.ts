export interface OllamaModel {
  name: string;
  size: number;
  details: {
    family: string;
    parameter_size: string;
    quantization_level: string;
  };
}
