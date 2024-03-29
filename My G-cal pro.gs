//RUN THIS ONE FOREVER
function traertodoslosCalendarios() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getActiveSheet();

  hoja.appendRow(["INICIO", "FIN", "NOMBRE", "CONTENIDO","EMAIL", "ORGANIZADOR", "INVITADOS", "LUGAR", "COLOR", "ID"]);

  const calendarios = CalendarApp.getAllOwnedCalendars()
  calendarios.forEach(calendario => {
    var eventos = calendario.getEvents(new Date(2023, 09, 24), new Date(2023, 09, 25));

    for (var i = 0; i < eventos.length; i++) {
      const evento = eventos[i];
      const id = evento.getId();
      const nombre = evento.getTitle();
      const contenido = evento.getDescription();
      const inicio = evento.getStartTime();
      const fin = evento.getEndTime();

      const organizador = evento.getCreators();
      const invitados = evento.getGuestList();
      
      var invitadosEmails = invitados.map(function (invitado) {
      return invitado.getEmail();
    });

      const lugar = evento.getLocation();
      const colorNumerico = evento.getColor();
      const email = calendario.getName();

      var colores = {
        1: { nombre: "Lavender", rgb: "#CCCCFF" },
        2: { nombre: "Sage", rgb: "#7EEDBD" },
        3: { nombre: "Grape", rgb: "#FA87F0" },
        4: { nombre: "Flamingo", rgb: "#F8CDD0" },
        5: { nombre: "Banana", rgb: "#FFDE26" },
        6: { nombre: "Tangerine", rgb: "#FFAC40" },
        7: { nombre: "Peacock", rgb: "#9FF5EC" },
        8: { nombre: "Graphite", rgb: "#B8B8B8" },
        9: { nombre: "Blueberry", rgb: "#9CBCFF" },
        10: { nombre: "Basil", rgb: "#64D969" },
        11: { nombre: "Tomato", rgb: "#ED987E" }
      };

      var color = colores[colorNumerico];

      var fila = hoja.getLastRow() + 1;
      hoja.appendRow([inicio, fin, nombre, contenido, email, organizador.join(", "), invitadosEmails.join(", "), lugar, color ? color.nombre : "", id]);

      if (color) {
        var rango = hoja.getRange(fila, 1, 1, hoja.getMaxColumns());
        rango.setBackground(color.rgb);
      }
    }
  })

}

//IF ONLY I WANT MY PRINCIPAL:
/*function traerCalendarioprincipal() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getActiveSheet();

  var idCalendario = "youremail@gmail.com";
  var micalendar = CalendarApp.getCalendarById(idCalendario);
  var eventos = micalendar.getEvents(new Date(2023, 04, 01), new Date(2023, 04, 03));

  hoja.appendRow(["INICIO", "FIN", "NOMBRE", "CONTENIDO", "ORGANIZADORES", "INVITADOS", "LUGAR", "COLOR", "ID"]);

  for (var i = 0; i < eventos.length; i++) {
    const evento = eventos[i];
    const id = evento.getId();
    const nombre = evento.getTitle();
    const contenido = evento.getDescription();
    const inicio = evento.getStartTime();
    const fin = evento.getEndTime();
    const organizadores = evento.getCreators();
    const invitados = evento.getGuestList();
    const lugar = evento.getLocation();
    const colorNumerico = evento.getColor();

    var colores = {
      1: { nombre: "Lavender", rgb: "#CCCCFF" },
      2: { nombre: "Sage", rgb: "#7EEDBD" },
      3: { nombre: "Grape", rgb: "#FA87F0" },
      4: { nombre: "Flamingo", rgb: "#F8CDD0" },
      5: { nombre: "Banana", rgb: "#FFDE26" },
      6: { nombre: "Tangerine", rgb: "#FFAC40" },
      7: { nombre: "Peacock", rgb: "#9FF5EC" },
      8: { nombre: "Graphite", rgb: "#B8B8B8" },
      9: { nombre: "Blueberry", rgb: "#9CBCFF" },
      10: { nombre: "Basil", rgb: "#64D969" },
      11: { nombre: "Tomato", rgb: "#ED987E" }
    };

    var color = colores[colorNumerico];

    var fila = hoja.getLastRow() + 1;
    hoja.appendRow([inicio, fin, nombre, contenido, organizadores, invitados, lugar, color ? color.nombre : "", id]);

    if (color) {
      var rango = hoja.getRange(fila, 1, 1, hoja.getMaxColumns());
      rango.setBackground(color.rgb);
    }
  }
}
*/
