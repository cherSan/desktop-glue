import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContainerTemplateComponent} from "../container-template/container-template.component";

@Component({
  standalone: true,
    imports: [CommonModule, ContainerTemplateComponent],
  templateUrl: './quit.component.html',
  styleUrls: ['./quit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuitComponent {}
