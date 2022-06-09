CREATE TABLE "users" (
"id" serial NOT NULL,
"name" TEXT NOT NULL,
"email" TEXT NOT NULL UNIQUE,
"password" TEXT NOT NULL,
"created_at" DATE NOT NULL DEFAULT CURRENT_DATE,
CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

CREATE TABLE "urls" (
"id" serial NOT NULL,
"url" TEXT NOT NULL,
"short_url" TEXT NOT NULL,
"visit_count" integer NOT NULL DEFAULT '0',
"user_id" serial NOT NULL,
"created_at" DATE NOT NULL DEFAULT CURRENT_DATE,
CONSTRAINT "urls_pk" PRIMARY KEY ("id")
);

ALTER TABLE "urls" ADD CONSTRAINT "urls_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");