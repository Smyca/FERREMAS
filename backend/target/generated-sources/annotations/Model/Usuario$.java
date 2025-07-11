package Model;

import com.speedment.jpastreamer.field.ComparableField;
import com.speedment.jpastreamer.field.StringField;

/**
 * The generated base for entity {@link Usuario} representing entities of the
 * {@code usuario}-table in the database.
 * <p> This file has been automatically generated by JPAStreamer.
 * 
 * @author JPAStreamer
 */
public final class Usuario$ {
    
    /**
     * This Field corresponds to the {@link Usuario} field "password".
     */
    public static final StringField<Usuario> password = StringField.create(
        Usuario.class,
        "password",
        usuario -> usuario.password,
        false
    );
    /**
     * This Field corresponds to the {@link Usuario} field "id".
     */
    public static final ComparableField<Usuario, Long> id = ComparableField.create(
        Usuario.class,
        "id",
        usuario -> usuario.id,
        false
    );
    /**
     * This Field corresponds to the {@link Usuario} field "email".
     */
    public static final StringField<Usuario> email = StringField.create(
        Usuario.class,
        "email",
        usuario -> usuario.email,
        true
    );
    /**
     * This Field corresponds to the {@link Usuario} field "username".
     */
    public static final StringField<Usuario> username = StringField.create(
        Usuario.class,
        "username",
        usuario -> usuario.username,
        true
    );
}