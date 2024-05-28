import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    /* Componentes Customizados Próprios */
  ],
})
export class CoreModule {
  /* Tendo Certeza que o CoreModule só esta sendo importado pelo AppModule (apenas uma NGModule) */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule já foi carregado. Importar somente no AppModule.'
      );
    }
  }
}
