import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr/';

@Injectable()
export class NotifyService {

    config = {
                positionClass: 'toast-bottom-right',
                timeOut: 5000,
                progressBar: true
            };

    constructor(private toastr: ToastrService) { }

    success(title: string, msg: string) {

        this.toastr.success(msg, title, this.config);
    }

    info(title: string, msg: string) {

        this.toastr.info(msg, title, this.config);
    }

    danger(title: string, msg: string) {
        this.toastr.error(msg, title, this.config);
    }

    warning(title: string, msg: string) {
        this.toastr.warning(msg, title, this.config);
    }

}
