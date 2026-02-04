import { HttpException, HttpStatus } from "@nestjs/common";

export class TodoNotFoundException extends HttpException{
    constructor(id:string) {
        super({
            message: `Todo ${id} not found`,
            errorCode: 'TODO NOT FOUND',
        },
    HttpStatus.NOT_FOUND,
);
    }
}