// import { Injectable } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/storage';

// @Injectable({
//   providedIn: 'root'
// })
// export class UploadService {

//   constructor(private storage: AngularFireStorage) { }

//   uploadFile(filePath: string, file: File): Promise<string> {
//     const uploadTask = this.storage.upload(filePath, file);
//     return uploadTask.snapshotChanges().pipe(
//       finalize(() => {
//         return this.storage.ref(filePath).getDownloadURL();
//       })
//     ).toPromise();
//   }
// }
