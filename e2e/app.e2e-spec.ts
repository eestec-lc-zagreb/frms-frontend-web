import { FrmsFrontendWebPage } from './app.po';

describe('frms-frontend-web App', function() {
  let page: FrmsFrontendWebPage;

  beforeEach(() => {
    page = new FrmsFrontendWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
