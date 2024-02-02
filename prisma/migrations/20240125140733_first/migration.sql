-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "imagePath" VARCHAR(200) NOT NULL,
    "userId" UUID NOT NULL,
    "releaseDate" DATE NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTag" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(70) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "hashedPassword" VARCHAR(200),
    "googleId" VARCHAR(200),
    "loggedWithGoogle" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "name_unique" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "googleId_unique" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "userId_FK" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectTag" ADD CONSTRAINT "projectId_FK" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectTag" ADD CONSTRAINT "tagId_FK" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
