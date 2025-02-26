import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';

interface ChatOption {
  img: string;
  title: string;
  description: string;
  questions: ChatQuestion[];
}

interface ChatQuestion {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @ViewChild('chatBody') private chatBody!: ElementRef;

  isChatOpen = false;
  isLoading = false;
  isLoading2 = false;

  selectedOption: ChatOption | null = null;
  selectedQuestion: ChatQuestion | null = null;
  view: 'home' | 'questions' | 'answer' = 'home';
  userMessage = '';
  messages: { sender: 'user' | 'bot'; text: string }[] = [];

  chatOptions: ChatOption[] = [
    {
      img: 'icon1',
      title: 'Acceso y autenticación',
      description: 'Iniciar sesión / recuperar contraseña',
      questions: [
        { question: '¿Cómo puedo acceder a mi historial clínico?', answer: 'Para buscar un historial clínico en concreto debes ir a la sección pacientes y buscar por nombre completo o DNI.' },
        { question: '¿Qué necesito para iniciar sesión en el sistema?', answer: 'Para poder ingresar al sistema necesitas un usuario y contraseñas únicos validado por el personal administrativo. Si no los tienes, solicita uno.' },
        { question: '¿Puedo recuperar mi contraseña si lo olvidé?', answer: 'Efectivamente si puedes, todo usuario y contraseña registrados se guardan en una base de datos, para poder recuperarlo debes consultar al personal administrativo.' }
      ]
    },
    {
      img: 'icon2',
      title: 'Consulta de información',
      description: 'Última consulta / diagnóstico',
      questions: [
        { question: '¿Si borro un paciente, este se borrará de la base de datos?', answer: 'No, al eliminar un paciente, su información no se eliminará permanentemente de la base de datos.' },
        { question: '¿Cómo busco un paciente?', answer: 'Ingresa a la sección "Pacientes" y utiliza el buscador ingresando nombre completo o DNI.' },
        { question: '¿Cuándo añado una historia clínica todos los campos deben estar llenados?', answer: 'Sí, es importante completar todos los campos para asegurar un registro clínico completo.' },
        { question: '¿Cómo veo los datos de un paciente?', answer: 'Para ver los datos de una historia clínica de un paciente debes ir a la sección historias clínicas y hacer click a la opción ver' }
      ]
    },
    {
      img: 'icon3',
      title: 'Gestión de citas médicas',
      description: 'Agenda citas / consulta disponibilidad',
      questions: [
        { question: '¿Puedo agendar una cita con un médico?', answer: 'Para agendar una cita médica con un determinado medico puedes ir a la pagina web de servicios en linea del HSJ y ver si el medico tiene citas disponibles. www.hsjch.gob.pe/serviciosenlinea/' },
        { question: '¿Cómo puedo ver si hay cita para un departamento?', answer: 'Para ver si hay cita para un determinado departamento y especialidad debes ir al sitio servicios en linea del hospital y buscar mediante la fecha y buscas el departamento que necesites. www.hsjch.gob.pe/serviciosenlinea/' },
        { question: '¿Qué hago si al buscar un paciente registrado no aparece?', answer: 'Si ocurre eso puede ser por varios factores, el primero porque la conexión a internet esta fallando o es lenta, el segundo porque puede ser que el sistema este lento y es mejorar cerrar sesión y volver a entrar.' }
      ]
    },
    {
      img: 'icon4',
      title: 'Soporte y ayuda',
      description: 'Contactar con soporte / información médica',
      questions: [
        { question: '¿Cómo puedo contactar con soporte técnico?', answer: 'Para contactar a soporte técnico por algún fallo del sistema, favorde comunicarse con el administrador y ver posibles soluciones al problema.' },
        { question: '¿Qué hago si hay datos erróneos en una historia clínica?', answer: 'Para corregir datos mal escritos diríjase a la sección historias clínicas presione la opción ver y vaya hasta abajo donde saldrá un botón editar haga click y podrá corregir los datos' },
        { question: '¿Qué hago si el sistema no responde o está lento?', answer: 'Si esto ocurre verificar si la conexióna internet es estable y si sigue fallando cerrar sesión, refrescar la pagina y volver a inciar sesion. Si el problema persiste, contacta a soporte.' }
      ]
    }
  ];

  constructor(private chatService: ChatService) { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  openChat() {
    this.isChatOpen = true;
    this.resetChat();
    this.messages = [];
  }

  closeChat() {
    this.isChatOpen = false;
    this.resetChat();
    this.messages = [];
    this.userMessage = '';
  }

  resetChat() {
    this.view = 'home';
    this.selectedOption = null;
    this.selectedQuestion = null;
  }

  selectOption(option: ChatOption) {
    this.selectedOption = option;
    this.view = 'questions';
    this.messages = [];
  }

  selectQuestion(question: ChatQuestion) {
    this.selectedQuestion = question;
    this.isLoading2 = true;

    setTimeout(() => {
      this.isLoading2 = false;
      this.messages = [];
      this.view = 'answer';
    }, 1000);
  }

  goBack() {
    if (this.view === 'answer' || this.view === 'questions') {
      this.view = 'home';
      this.selectedQuestion = null;
      this.selectedOption = null;
      this.messages = [];
    }
  }

  sendMessage() {
    const message = this.userMessage.trim();
    if (!message) return;

    // Agrega el mensaje del usuario al chat
    this.messages.push({ sender: 'user', text: message });
    this.userMessage = '';
    this.isLoading = true;

    // Llama al servicio para obtener respuesta de Gemini
    this.chatService.sendMessage(message).subscribe(
      response => {
        this.messages.push({ sender: 'bot', text: response });
        this.isLoading = false;
      },
      error => {
        console.error('Error:', error);
        this.messages.push({ sender: 'bot', text: 'Error al obtener respuesta.' });
        this.isLoading = false;
      }
    );
  }

  private scrollToBottom(): void {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (err) {
      console.error('No se pudo desplazar al final del chat:', err);
    }
  }
}
