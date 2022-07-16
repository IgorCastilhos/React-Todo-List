/* 
  Função getClasses cria um Array de classes filtrado(sem itens vazios).
  Se não estiver vazio, retornará normalmente, se estiver vazio, será filtrado para fora. 
*/

export const getClasses = (classes) =>
  classes
    .filter((item) => item !== '')
    .join(' ') // No final é preciso juntar toda as classes com um espaço.
    .trim(); // Se tiver algum espaço no final, o trim irá apagá-lo.
