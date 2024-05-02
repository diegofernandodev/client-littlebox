import { Component, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.component.html',
  styleUrls: ['./introduccion.component.scss'],
})
export class IntroduccionComponent {
  
  constructor(
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
  ) {}

  titulos: string[] = [
    '¿Cómo registro mi empresa?',
    'Autenticación y inicio de sesión de gerente',
    'Explicación del contenido a primera vista',
    'Funcionalidades como gerente',
    '¿Cómo crear el rol administrador?',
    'Inicio de sesion como administrador',
    '¿Cómo me registro con el rol de colaborador?',
    'Aprobación y inicio de sesion Colaborador ',
    '¿Como puedo crear una solicitud?',
    'Cambios de estado de la solicitud y creación de egreso',
    'Explicación de graficos e informes',
  ];

  subtitulos: string[] = [
    'El video contiene la demostración para registrarte como empresa en nuestra aplicación:',
    'El video contiene la explicación faltante de las funciones al iniciar:',
    'El video contiene la explicación de algunas funcionalidades del gerente:',
    'El video contiene la creación de un nuevo rol con funcionalidades especificas:',
    'El video contiene el inicio de sesion para el rol anterior:',
    'El video contiene la demostración para registrarse como colaborador: ',
    'El video contiene la creación de nuestra primer solicitud:',
    'El video contiene la el cambio de estados generales en las solicitudes:',
    'El video contiene la expliacación con ejemplos de graficos y informes:',
  ];

  descripciones: string[][] = [
    [
      'Durante el video, te proporcionaré una explicación detallada de cada paso del proceso de registro como empresa, junto con definiciones claras para asegurarnos de que comprendas completamente cada etapa.',
      'En este video, detallaré la importancia de cada campo en nuestros formularios de registro. Esta explicación te proporcionará una comprensión clara de los requisitos necesarios para completar el registro de manera exitosa. Al finalizar el proceso de registro, recibirás una breve explicación para guiarte hacia el siguiente paso de manera fluida.',
    ],

    [
      'Durante el video, te mostrare como iniciar sesión como empresa con los datos proporcionados por la aplicación.',
      'Además, contendra una demostración de las condiciones al iniciar sesión por primera vez.',
    ],

    [
      'Durante el video, te proporcionaré una explicación no tan detallada de los formatos que se encuentran en el inicio.',
      'Además, contendra una definición basica para entender a que rol pertenece cada acción y la importancia de flujos de roles.',
    ],

    [
      'Este video es fundamental para todos los gerentes, contendra un paso a paso de todo lo que se debe hacer con anterioridad.',
      'Además, tendrá demostraciones para creaciones de muchas de las funciones que estan proporcionadas solo para gerente.',
    ],

    [
      'Este video es fundamental para la creación de un rol en especifico, este rol es el encargado de la gestión dentro de la app.',
      'En el video se podra apreciar paso a paso la creación de este rol, además mostrara algunas funciones adicionales sobre el gerente.',
    ],

    [
      'Demostración de los datos de la cuenta para iniciar sesión como administrador.',
      'Demostración de como iniciar sesión como administrador.',
      'Explicación basica de la dependecia del rol administrador con otro rol aparte.',
    ],

    [
      'El video contiene el registro de un nuevo rol.',
      'Además, tendrá una expliación importante sobre el formulario de registro.',
    ],

    [
      'El video contiene la demostración para la aprobación del rol anterior, esta funcionalidad es proporcianado para el administrador.',
      'Además, muestra la aprobación y los datos fundamentales para el inicio de sesión para el rol de colaborador .',
    ],

    [
      'Este video muestra la capacidad y funcionalidades que puede hacer el colaborador.',
      'Además, contiene algunas expliaciones relevantes sobre formularios, funcionalidades y acciones.',
    ],

    [
      'Este video puede ser algo largo porque contiene un flujo entre solicitud y egresos.',
      'Además, contiene una expliación de los estados para las solicitudes, el flujo de los estados y que hacer despues de cada estado.',
      'Por contraparte, tambien muestra la creación de egresos y la explicación de su funcionalidad en base a la relación con las solicitudes',
    ],

    [
      'Como ultimo video, obtendran la demostración de la funcionalidad de graficos y informes.',
      'Además, contiene una expliación de paso a paso para cada funcionalidad.',
    ],
  ];

  videos: string[] = [
    'WsIuGeg6Nm4',
    'Gi4iKeYwxZg',
    'fm1QmIVsotg',
    'x2L1MCcOAm4',
    'RnNmFA5_GNc',
    'j_ob-mqz3lU',
    'Aw9BV8HJ-04',
    'ubW3cIhhDOM',
    'UsTR-yCWa6g',
    'RHA0W7Md8O0',
    'PPtzfQGmwQE',
  ];

  getYouTubeEmbedUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  ngAfterViewInit() {
    const modalElements =
      this.elementRef.nativeElement.querySelectorAll('.modal');

    modalElements.forEach((modalElement: HTMLElement) => {
      modalElement.addEventListener('hidden.bs.modal', () => {
        console.log('Modal cerrado');
        const videoElement = modalElement.querySelector('video');
        if (videoElement && !videoElement.paused) {
          videoElement.pause();
        }
      });
    });
  }
}
