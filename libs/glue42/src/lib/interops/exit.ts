import {InteropDescription} from "./interop-description.type";
import {Observable} from "rxjs";
import {Glue42} from "@glue42/desktop";

export const exit: InteropDescription<void, void> = {
  id: 'exit',
  name: { name: 'exit' },
  handler: (glue) => {
    return () => glue.layouts.getCurrentLayout()
      .then(current => current && glue.layouts.hibernate(current.name))
      .then(() => glue.windows.find('toolbar').close())
  },
  callFunction: (glue) => {
    return () => {
      return new Observable<Glue42.Interop.InvocationResult<void>>(sub => {
        glue.interop.invoke<void>('exit')
          .then((res) => {
            sub.next(res)
          })
          .catch((err) => {
            sub.error(err)
          })
      })
    }
  }
}
