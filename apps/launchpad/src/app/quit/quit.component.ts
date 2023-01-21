import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quit.component.html',
  styleUrls: ['./quit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuitComponent {}
