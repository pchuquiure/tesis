# -*- coding: utf-8 -*-
from django.db import models

class Persona(models.Model):
    """ Persona Model
    """
    dni = models.IntegerField(u'Dni', primary_key=True)
    nombre = models.CharField(u'Nombre', blank=False, max_length=45)
    apellidos = models.CharField(u'Apellidos', blank=False, max_length=45)
    telefono = models.CharField(u'Teléfono', blank=False, max_length=45)
    direccion = models.CharField(u'Dirección', blank=False, max_length=100)

    def __unicode__(self):
        return u'%s %s' % (self.nombre, self.apellidos)

    class Meta:        
        verbose_name = 'Persona'
        verbose_name_plural = 'Personas'

class Usuario(models.Model):
    """ Usuario Model
    """
    estado = models.CharField(u'Estado', blank=False, max_length=45)
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)
    persona = models.ForeignKey(Persona)

    def __unicode__(self):
        return u'%s' % (self.persona)

    class Meta:        
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

class Carpeta(models.Model):
    nombre = models.CharField(u'Nombre', blank=False, max_length=45)    
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)

class CasoPrueba(models.Model):
    """ Caso por Prueba Model
    ForeignKey: Usuario
    """
    nombre = models.CharField(u'Nombre', blank=False, max_length=45)
    ruta = models.CharField(u'Ruta', blank=False, max_length=45)
    tipo = models.CharField(u'Tipo', blank=False, max_length=45)
    estado = models.CharField(u'Estado', blank=False, max_length=45)    
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)    
    usuario = models.ForeignKey(Usuario)
    carpeta = models.ForeignKey(Carpeta)    

class Aplicativo(models.Model):
    """ Aplicativo Model
    """
    nombre = models.CharField(u'Nombre', blank=False, max_length=45)

    def __unicode__(self):
        return u'%s' % (self.nombre)

    class Meta:        
        verbose_name = 'Aplicativo'
        verbose_name_plural = 'Aplicativos'

class Canal(models.Model):
    """ Canal Model
    """
    nombre = models.CharField(u'Nombre', blank=False, max_length=45)

    def __unicode__(self):
        return u'%s' % (self.nombre)

    class Meta:        
        verbose_name = 'Canal'
        verbose_name_plural = 'Canales'

    
class Peticion(models.Model):
    """ Peticion Model
    ForeignKey: Aplicativo, Canal, Usuario
    """
    nombre = models.CharField(u'Nombre', blank=False, max_length=45)
    descripcion = models.CharField(u'Descripción', max_length=200, 
        blank=False)    
    estado = models.CharField(u'Estado', blank=False, max_length=45)
    imagen = models.ImageField('Imagen Equipo', max_length=455,
        upload_to='peticiones/%Y/%m/%d', null=True)
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)
    aplicativo = models.ForeignKey(Aplicativo)
    canal = models.ForeignKey(Canal)
    usuario = models.ForeignKey(Usuario)

class Adjunto(models.Model):    
    tamano = models.CharField(u'Tamano', blank=False, max_length=45)
    imagen = models.FileField('Archivo', max_length=455,
        upload_to='peticiones', null=True)
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)
    peticion = models.ForeignKey(Peticion)

class CasoPeticion(models.Model):
    """ Caso por Peticion Model
    ForeignKey: Peticion, CasoPrueba
    """
    peticion = models.ForeignKey(Peticion)
    caso_prueba = models.ForeignKey(CasoPrueba)

class TipoDefecto(models.Model):
    nombre = models.CharField(u'Nombre', blank=False, max_length=45)
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)

    def __unicode__(self):
        return u'%s' % (self.nombre)

class Defecto(models.Model):
    """ Defecto Model
    ForeignKey: Peticion, Usuario
    """
    nombre = models.CharField(u'Nombre', blank=False, max_length=45)
    resumen = models.CharField(u'Resumen', max_length=200, 
        blank=False)
    descripcion = models.CharField(u'Descripción', max_length=200, 
        blank=False)
    estado = models.CharField(u'Estado', blank=False, max_length=45)
    tipo = models.ForeignKey(TipoDefecto)
    gravedad = models.CharField(u'Gravedad', blank=False, max_length=45)
    imagen = models.ImageField('Imagen Equipo', max_length=200,
        upload_to='defecto', null=True)
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)
    peticion = models.ForeignKey(Peticion)    
    usuario = models.ForeignKey(Usuario)

class Ciclo(models.Model):
    """ Ciclo Model
    ForeignKey: Peticion
    """    
    estado = models.CharField(u'Estado', blank=False, max_length=45)    
    prioridad = models.CharField(u'Prioridad', blank=False, max_length=45)    
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)
    fechaModificacion = models.DateTimeField(u'Fecha de modificación',
        auto_now=True)
    peticion = models.ForeignKey(Peticion)

class CasoCiclo(models.Model):
    """ Caso por ciclo Model
    ForeignKey: Ciclo, CasoPrueba
    """
    ciclo = models.ForeignKey(Ciclo)
    caso_prueba = models.ForeignKey(CasoPrueba)

class PasoPrueba(models.Model):
    """ Paso de Prueba Model    
    """
    num_paso = models.IntegerField(u'Número de Paso', blank=False)
    descripcion = models.CharField(u'Descripción', blank=False, max_length=200)
    esperado = models.CharField(u'Esperado', blank=False, max_length=200)
    observaciones = models.CharField(u'Observaciones', blank=False, 
        max_length=200)

class PasoCaso(models.Model):
    """ Paso por Caso Model
    ForeignKey: CasoPrueba,PasoPrueba
    """
    paso_prueba = models.ForeignKey(PasoPrueba)
    caso_prueba = models.ForeignKey(CasoPrueba)

class EjeCarpeta(models.Model):
    nombre = models.CharField(u'Nombre', blank=False, max_length=45)    
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)

class EjePrueba(models.Model):
    carpeta = models.ForeignKey(EjeCarpeta)
    peticion = models.ForeignKey(Peticion)
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)

class EjePruebaPruebas(models.Model):    
    ejeprueba = models.ForeignKey(EjePrueba)
    prueba = models.ForeignKey(CasoPrueba)

class EjeAdjunto(models.Model):    
    tamano = models.CharField(u'Tamano', blank=False, max_length=45)
    imagen = models.FileField('Archivo', max_length=455,
        upload_to='pruebasp', null=True)
    fechaCreacion = models.DateTimeField(u'Fecha de creación', 
        auto_now_add=True)
    ejepruebap = models.ForeignKey(EjePruebaPruebas)