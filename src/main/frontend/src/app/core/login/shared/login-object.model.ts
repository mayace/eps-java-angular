export class LoginObject {
    public nick: string;
    public pass: string;

    constructor(object: any){
        this.nick = (object.nick) ? object.nick : null;
        this.pass = (object.pass) ? object.pass : null;
    }
}