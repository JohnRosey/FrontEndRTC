export interface LoginResponse {
    success: boolean;
    message: string;
    currentUser?: any; // ou définir une autre interface pour currentUser si vous connaissez sa structure
    [key: string]: any; // cela permet d'accepter n'importe quelle autre clé/valeur dans l'objet
  }
  