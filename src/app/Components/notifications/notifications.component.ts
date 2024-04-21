import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  previousNotifications: any[] = [];
  notificationsCount: number = 0;
  initialNotificationCount = 10; // Define el número inicial de notificaciones a mostrar
  visibleNotifications: any[] = [];
  showLoadMoreLink: boolean = true; // Variable de control para mostrar u ocultar el enlace "Mostrar más"

  subscription: Subscription = new Subscription();
  routerSubscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.refreshNotifications();
    this.subscription = interval(30000).subscribe(() => {
      this.refreshNotifications();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  refreshNotifications(): void {
    this.notificationService.getNotificationsByUserId().subscribe(
      (notifications) => {
        const newNotifications = this.getNewNotifications(notifications);
        if (newNotifications.length > 0) {
          this.notificationsCount += newNotifications.length;
        }
        // Ordenar las notificaciones en orden inverso (las más nuevas primero)
        notifications.reverse();
        this.notifications = notifications;
        this.previousNotifications = notifications;
        // Mostrar solo las primeras 10 notificaciones inicialmente
        this.visibleNotifications = this.notifications.slice(0, this.initialNotificationCount);
        // Determinar si se deben mostrar más notificaciones
        this.showLoadMoreLink = this.notifications.length > this.initialNotificationCount;
      },
      (error) => {
        console.error('Error al obtener las notificaciones:', error);
      }
    );
  }
  

  loadMoreNotifications() {
    // Añadir 10 notificaciones adicionales a las visibles
    const startIndex = this.visibleNotifications.length;
    const endIndex = startIndex + this.initialNotificationCount;
    this.visibleNotifications = [...this.visibleNotifications, ...this.notifications.slice(startIndex, endIndex)];
    // Ocultar el enlace "Mostrar más" si no hay más notificaciones para mostrar
    if (this.visibleNotifications.length >= this.notifications.length) {
      this.showLoadMoreLink = false;
    }
  }

  getNewNotifications(notifications: any[]): any[] {
    return notifications.filter(notification => !this.previousNotifications.includes(notification));
  }

  handleClickNotification(notificationId: string) {
    this.notificationService.markNotificationAsRead(notificationId)
      .subscribe(() => {
        // Realiza alguna acción adicional si es necesario, como actualizar la lista de notificaciones
      }, error => {
        console.error('Error al marcar la notificación como leída:', error);
      });
  }
}
