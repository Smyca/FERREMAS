package Controller;

import Repository.UsuarioRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    public static class LoginRequest {
        public String email;
        public String password;
    }

    public static class LoginResponse {
        public boolean success;
        public String message;
    }

    @Inject
    UsuarioRepository usuarioRepository;

    @POST
    public Response login(LoginRequest request) {
        var usuario = usuarioRepository.findByEmailAndPassword(request.email, request.password);
        LoginResponse resp = new LoginResponse();
        if (usuario != null) {
            resp.success = true;
          
            return Response.ok(resp).build();
        } else {
            resp.success = false;
            resp.message = "Usuario o contraseña incorrectos";
            return Response.status(Response.Status.UNAUTHORIZED).entity(resp).build();
        }
    }
}