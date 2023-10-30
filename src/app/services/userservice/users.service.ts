import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { userLogin } from 'src/app/models/userLogin';
import { alumno } from 'src/app/models/alumno';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL_SUPEBASE = 'https://ndroieqpblapcuoesdhr.supabase.co/rest/v1/'
  constructor(private _httpcliente: HttpClient) { }

  supebaseheards = new HttpHeaders()
    .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcm9pZXFwYmxhcGN1b2VzZGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyODY2MTUsImV4cCI6MjAxMjg2MjYxNX0.yIT6MJyBQ5ErLYH5aqPdpTw5reje0SpQmYpE4RoJI58')

  //Alumno
  getLogin(UserLogin: userLogin): Observable<string | any> {
    return this._httpcliente.get<any>(this.URL_SUPEBASE + "Alumno?correo=eq." + UserLogin.usuario + "&password=eq." + UserLogin.password, { headers: this.supebaseheards }).pipe(
      map((user) => {
        console.log("Map", user[0])
        return user[0]
      }), catchError((err) => {
        console.log(err)
        return err;
      })
    )
  }


  //agregarAlumnos
  AgregarAlumno(newUser: alumno): Observable<any> {
    // Define los datos del nuevo usuario que deseas agregar
    console.log(newUser)
    return this._httpcliente.post<any>(this.URL_SUPEBASE + 'Alumno',newUser, { headers: this.supebaseheards }).pipe(
      catchError((error) => {
        console.error('Error al crear un nuevo usuario', error);
        return error;
      })
    );
  }


  //Carrera
  getCarrera(id: number | undefined){
    return this._httpcliente.get<any>(this.URL_SUPEBASE + 'Carrera?id_carrera=eq.'+ id, { headers: this.supebaseheards }).pipe(
    map((user) => {
        console.log("Map", user[0])
        return user[0]
      }), catchError((err) => {
        console.log(err)
        return err;
      })
    );
  }

  //Asignatura Rut

  getAsignaturas(rut: string | undefined){
    return this._httpcliente.get<any>(this.URL_SUPEBASE + 'Asignatura?rut_alumno=eq.'+ rut, { headers: this.supebaseheards }).pipe(   
      catchError((error) => {
        console.error('Error al encontrar asignatura', error);
        return error;
      })
    );
  }

  //Asignatura id_horario
  getAsignaturasHorario(id_asignatura: number){
    return this._httpcliente.get<any>(this.URL_SUPEBASE + 'Asignatura?id_asignatura=eq.'+ id_asignatura, { headers: this.supebaseheards }).pipe(   
      catchError((error) => {
        console.error('Error al encontrar asignatura', error);
        return error;
      })
    );
  }



  //Registro Asistencia

  getRegistroAsistencia(rut: string | undefined ){
    return this._httpcliente.get<any>(this.URL_SUPEBASE + 'RegistroAsistencia?rut_alumno=eq.'+ rut, { headers: this.supebaseheards }).pipe(   
      catchError((error) => {
        console.error('Error al encontrar Registro de asistencia ', error);
        return error;
      })
    );

  }
  //Registro Asistencia alumno pasa a presente 
  putRegistroAsistenciaActuali(id_asistencia: number ,estado_asistencia: string){
    const body = {
      id_asistencia,          // Agrega la propiedad "id_asistencia"
      estado_asistencia
    };
    return this._httpcliente.put<any>(this.URL_SUPEBASE +'RegistroAsistencia?id_asistencia=eq.'+id_asistencia,body,{ headers: this.supebaseheards }).pipe(   
      catchError((error) => {
        console.error('Error al encontrar Registro de asistencia ', error);
        return error;
      })
    );

  }


  //Seccion
  getSeccion(id_seccion: number | undefined ){
    return this._httpcliente.get<any>(this.URL_SUPEBASE + 'Seccion?id_seccion=eq.'+ id_seccion, { headers: this.supebaseheards }).pipe(   
      catchError((error) => {
        console.error('Error al encontrar Registro de asistencia ', error);
        return error;
      })
    );

  }

  //Horario Rut
  getHorario(id_asignatura: number | undefined){
    return this._httpcliente.get<any>(this.URL_SUPEBASE + 'Horario?id_asignatura=eq.'+ id_asignatura, { headers: this.supebaseheards }).pipe(   
      catchError((error) => {
        console.error('Error al encontrar horario', error);
        return error;
      })
    );
  }

  //Horario id_horario
  getHorarioAsis(id_horario: number | undefined){
    return this._httpcliente.get<any>(this.URL_SUPEBASE + 'Horario?id_horario=eq.'+ id_horario, { headers: this.supebaseheards }).pipe(   
      catchError((error) => {
        console.error('Error al encontrar horario', error);
        return error;
      })
    );
  }

}
