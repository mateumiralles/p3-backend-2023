-- CreateTable
CREATE TABLE "Entrenamiento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tiempo" INTEGER NOT NULL DEFAULT 40,
    "dia" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Entrenamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ejercicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "repeticiones" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entrenamientoId" INTEGER NOT NULL,

    CONSTRAINT "Ejercicio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombre_key" ON "Usuario"("nombre");

-- AddForeignKey
ALTER TABLE "Entrenamiento" ADD CONSTRAINT "Entrenamiento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ejercicio" ADD CONSTRAINT "Ejercicio_entrenamientoId_fkey" FOREIGN KEY ("entrenamientoId") REFERENCES "Entrenamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
