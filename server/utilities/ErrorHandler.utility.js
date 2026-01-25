
export class ErrorHandler extends Error{
     constructor(status, errMessage){
          super(errMessage);
          this.statusCode = status;
     }
}

