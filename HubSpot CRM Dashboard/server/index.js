import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

// Crear nuestra aplicación Express
const app = express();

// Definir el puerto del servidor
const PORT = 3000;

// Permitir la comunicación con React
app.use(cors({
  origin: "http://localhost:5173"
}));

// Permitir recibir y procesar JSON
app.use(express.json());

// Primera ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "Nuestro backend está funcionando"
  });
});

// MÉTODO GET: consultar contactos
app.get("/api/contacts", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts?limit=100&properties=firstname,lastname,email,company,phone",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_SERVICE_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);

  } catch (error) {
    console.error("Error al consultar HubSpot:", error);

    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
});

// MÉTODO PATCH: actualizar contactos
app.patch("/api/contacts/:id", async (req, res) => {
  try {
    // Obtener el ID del contacto
    const { id } = req.params;

    // Obtener los datos enviados desde React
    const { firstname, lastname, email, company, phone } = req.body;

    // Enviar la solicitud a HubSpot
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_SERVICE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          properties: {
            firstname,
            lastname,
            email,
            company,
            phone
          }
        })
      }
    );

    const data = await response.json();

console.log("Estado de HubSpot:", response.status);
console.log("Respuesta de HubSpot:", data);

// Verificar si hubo un error
if (!response.ok) {
  return res.status(response.status).json(data);
}

    // Devolver el contacto actualizado a React
    res.json(data);

  } catch (error) {
    console.error("Error al actualizar contacto:", error);

    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});