import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _isLeftSidebarCollapsed = signal<boolean>(false);
  private _screenWidth = signal<number>(window.innerWidth);

  get isLeftSidebarCollapsed() {
    return this._isLeftSidebarCollapsed.asReadonly();
  }

  get screenWidth() {
    return this._screenWidth.asReadonly();
  }

  setIsLeftSidebarCollapsed(value: boolean) {
    this._isLeftSidebarCollapsed.set(value);
  }

  setScreenWidth(value: number) {
    this._screenWidth.set(value);
  }
}

