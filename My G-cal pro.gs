function traerCalendarios() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getActiveSheet();

  var idCalendario = "youremail@gmail.com";
  var micalendar = CalendarApp.getCalendarById(idCalendario);
  var eventos = micalendar.getEvents(new Date(2023, 00, 13), new Date(2023, 09, 09));

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