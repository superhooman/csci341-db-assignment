-- CreateTable
CREATE TABLE "DiseaseType" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(140) NOT NULL,

    CONSTRAINT "DiseaseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "cname" VARCHAR(50) NOT NULL,
    "population" BIGINT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("cname")
);

-- CreateTable
CREATE TABLE "Disease" (
    "disease_code" VARCHAR(50) NOT NULL,
    "pathogen" VARCHAR(20) NOT NULL,
    "description" VARCHAR(140) NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("disease_code")
);

-- CreateTable
CREATE TABLE "Discover" (
    "cname" VARCHAR(50) NOT NULL,
    "disease_code" VARCHAR(50) NOT NULL,
    "first_enc_date" DATE NOT NULL,

    CONSTRAINT "Discover_pkey" PRIMARY KEY ("cname","disease_code")
);

-- CreateTable
CREATE TABLE "Users" (
    "email" VARCHAR(60) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "surname" VARCHAR(40) NOT NULL,
    "salary" INTEGER NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "cname" VARCHAR(50) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "PublicServant" (
    "email" VARCHAR(60) NOT NULL,
    "department" VARCHAR(50) NOT NULL,

    CONSTRAINT "PublicServant_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "email" VARCHAR(60) NOT NULL,
    "degree" VARCHAR(20) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Specialize" (
    "id" INTEGER NOT NULL,
    "email" VARCHAR(60) NOT NULL,

    CONSTRAINT "Specialize_pkey" PRIMARY KEY ("id","email")
);

-- CreateTable
CREATE TABLE "Record" (
    "email" VARCHAR(60) NOT NULL,
    "cname" VARCHAR(50) NOT NULL,
    "disease_code" VARCHAR(50) NOT NULL,
    "total_deaths" INTEGER NOT NULL,
    "total_patients" INTEGER NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("email","cname","disease_code")
);

-- AddForeignKey
ALTER TABLE "Disease" ADD CONSTRAINT "Disease_id_fkey" FOREIGN KEY ("id") REFERENCES "DiseaseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discover" ADD CONSTRAINT "Discover_disease_code_fkey" FOREIGN KEY ("disease_code") REFERENCES "Disease"("disease_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discover" ADD CONSTRAINT "Discover_cname_fkey" FOREIGN KEY ("cname") REFERENCES "Country"("cname") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_cname_fkey" FOREIGN KEY ("cname") REFERENCES "Country"("cname") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicServant" ADD CONSTRAINT "PublicServant_email_fkey" FOREIGN KEY ("email") REFERENCES "Users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_email_fkey" FOREIGN KEY ("email") REFERENCES "Users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specialize" ADD CONSTRAINT "Specialize_id_fkey" FOREIGN KEY ("id") REFERENCES "DiseaseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specialize" ADD CONSTRAINT "Specialize_email_fkey" FOREIGN KEY ("email") REFERENCES "Doctor"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_email_fkey" FOREIGN KEY ("email") REFERENCES "PublicServant"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_cname_fkey" FOREIGN KEY ("cname") REFERENCES "Country"("cname") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_disease_code_fkey" FOREIGN KEY ("disease_code") REFERENCES "Disease"("disease_code") ON DELETE CASCADE ON UPDATE CASCADE;
