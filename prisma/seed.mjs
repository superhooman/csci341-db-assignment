import { PrismaClient } from "@prisma/client"

const client = new PrismaClient();

const DISEASE_TYPES = [
    'infectious',
    'deficiency',
    'hereditary',
    'physiological',
    'virology',
    'parasitology',
    'immunology',
    'microbiology',
    'pathology',
    'unknown',
];

const COUNTRIES = [
    {
        cname: 'Scotland',
        population: 5_400_000,
    },
    {
        cname: 'Italy',
        population: 59_070_000,
    },
    {
        cname: 'Kazakhstan',
        population: 18_000_000,
    },
    {
        cname: 'United States',
        population: 331_900_000,
    },
    {
        cname: 'China',
        population: 1_439_323_776,
    },
    {
        cname: 'Russia',
        population: 145_900_000,
    },
    {
        cname: 'Germany',
        population: 83_800_000,
    },
    {
        cname: 'France',
        population: 67_800_000,
    },
    {
        cname: 'United Kingdom',
        population: 67_800_000,
    },
    {
        cname: 'Spain',
        population: 46_700_000,
    },
];

const main = async () => {
    await client.discover.deleteMany();
    await client.disease.deleteMany();
    await client.specialize.deleteMany();
    await client.doctor.deleteMany();
    await client.record.deleteMany();
    await client.publicServant.deleteMany();
    await client.users.deleteMany();
    await client.country.deleteMany();
    await client.diseaseType.deleteMany();

    const diseaseTypes = await Promise.all(DISEASE_TYPES.map((str) => {
        return client.diseaseType.create({
            data: {
                description: str,
            }
        })
    }));

    const diseaseDict = diseaseTypes.reduce((acc, diseaseType) => {
        acc[diseaseType.description] = diseaseType.id;
        return acc;
    }, {});

    const DISEASES = [
        {
            disease_code: 'B95.6',
            description: 'A Gram-positive, round-shaped bacterium that is a member of the Firmicutes',
            pathogen: 'bacteria',
            id: diseaseDict.infectious,
        },
        {
            disease_code: 'E11.65',
            description: 'A chronic disease characterized by high blood sugar levels',
            pathogen: 'aureus',
            id: diseaseDict.hereditary,
        },
        {
            disease_code: 'COVID-2019',
            pathogen: 'SARS-CoV-2',
            description: 'Coronavirus disease',
            id: diseaseDict.infectious,
        },
        {
            disease_code: 'A00.0',
            description: 'A bacterial infection that causes food poisoning',
            pathogen: 'bacteria',
            id: diseaseDict.infectious,
        },
        {
            disease_code: 'A00.1',
            description: 'A chronic disease characterized by low blood sugar levels',
            pathogen: 'aureus',
            id: diseaseDict.hereditary,
        },
        {
            disease_code: 'A00.2',
            description: 'A Gram-positive, round-shaped bacterium that is a member of the Firmicutes',
            pathogen: 'bacteria',
            id: diseaseDict.infectious,
        },
        {
            disease_code: 'A00.3',
            description: 'A chronic disease characterized by high blood sugar levels',
            pathogen: 'aureus',
            id: diseaseDict.hereditary,
        },
        {
            disease_code: 'A00.4',
            description: 'A bacterial infection that causes food poisoning',
            pathogen: 'bacteria',
            id: diseaseDict.infectious,
        },
        {
            disease_code: 'A00.5',
            description: 'A chronic disease characterized by low blood sugar levels',
            pathogen: 'aureus',
            id: diseaseDict.hereditary,
        },
        {
            disease_code: 'A00.6',
            description: 'A Gram-positive, round-shaped bacterium that is a member of the Firmicutes',
            pathogen: 'bacteria',
            id: diseaseDict.infectious,
        },
    ];

    const DISCOVER = [
        {
            cname: 'Scotland',
            disease_code: 'B95.6',
            first_enc_date: new Date('1880-01-01'),
        },
        {
            cname: 'Italy',
            disease_code: 'E11.65',
            first_enc_date: new Date('1920-01-01'),
        },
        {
            cname: 'Kazakhstan',
            disease_code: 'COVID-2019',
            first_enc_date: new Date('2020-02-13'),
        },
        {
            cname: 'United States',
            disease_code: 'A00.0',
            first_enc_date: new Date('1999-01-01'),
        },
        {
            cname: 'China',
            disease_code: 'A00.1',
            first_enc_date: new Date('1992-01-01'),
        },
        {
            cname: 'Russia',
            disease_code: 'A00.2',
            first_enc_date: new Date('2020-01-01'),
        },
        {
            cname: 'Germany',
            disease_code: 'A00.3',
            first_enc_date: new Date('2013-01-01'),
        },
        {
            cname: 'France',
            disease_code: 'A00.4',
            first_enc_date: new Date('2010-01-01'),
        },
        {
            cname: 'United Kingdom',
            disease_code: 'A00.5',
            first_enc_date: new Date('1998-01-01'),
        },
        {
            cname: 'Spain',
            disease_code: 'A00.6',
            first_enc_date: new Date('1993-01-01'),
        },
    ]

    await client.disease.createMany({
        data: DISEASES,
    });

    await client.country.createMany({
        data: COUNTRIES,
    });

    await client.discover.createMany({
        data: DISCOVER,
    })

    await client.specialize.create({
        data: {
            disease: {
                connect: {
                    id: diseaseDict.hereditary,
                }
            },
            doctor: {
                create: {
                    degree: 'PhD',
                    user: {
                        create: {
                            email: 'mail@example.com',
                            name: 'John',
                            surname: 'Doe',
                            salary: 3000,
                            phone: '+77070008501',
                            cname: 'Scotland',
                        }
                    }
                }
            }
        },
    });

    const doctorWith3 = await client.doctor.create({
        data: {
            degree: 'PhD',
            user: {
                create: {
                    email: 'doc@example.com',
                    name: 'Janebek',
                    surname: 'Doe',
                    salary: 4500,
                    phone: '+77770101123',
                    cname: 'Italy',
                }
            }
        }
    });

    await client.specialize.create({
        data: {
            id: diseaseDict.physiological,
            email: doctorWith3.email,
        },
    });

    await client.specialize.create({
        data: {
            id: diseaseDict.virology,
            email: doctorWith3.email,
        },
    });

    await client.specialize.create({
        data: {
            id: diseaseDict.hereditary,
            email: doctorWith3.email,
        },
    });

    await client.specialize.create({
        data: {
            disease: {
                connect: {
                    id: diseaseDict.virology,
                }
            },
            doctor: {
                create: {
                    degree: 'PhD',
                    user: {
                        create: {
                            email: 'doc2@example.com',
                            name: 'Gulmira',
                            surname: 'Moore',
                            salary: 9000,
                            phone: '+7377010231',
                            cname: 'Italy',
                        }
                    }
                }
            }
        }
    });

    const servant1 = await client.publicServant.create({
        data: {
            department: 'Dept1',
            user: {
                create: {
                    email: 'ps1@domain.me',
                    name: 'Alibek',
                    surname: 'Dorm',
                    salary: 1000,
                    phone: '+77070707172',
                    cname: 'Kazakhstan',
                }
            }
        }
    });

    const servant2 = await client.publicServant.create({
        data: {
            department: 'Dept1',
            user: {
                create: {
                    email: 'ps2@domain.me',
                    name: 'Miko',
                    surname: 'Kali',
                    salary: 1200,
                    phone: '+77070303132',
                    cname: 'Kazakhstan',
                }
            }
        }
    });

    const servant3 = await client.publicServant.create({
        data: {
            department: 'Dept2',
            user: {
                create: {
                    email: 'ps3@domain.me',
                    name: 'Kaneki',
                    surname: 'Ken',
                    salary: 100,
                    phone: '+77771000712',
                    cname: 'Italy',
                }
            }
        }
    });

    const servant4 = await client.publicServant.create({
        data: {
            department: 'Dept1',
            user: {
                create: {
                    email: 'ps5@domain.me',
                    name: 'Elon',
                    surname: 'Musk',
                    salary: 120,
                    phone: '+77771999712',
                    cname: 'Kazakhstan',
                }
            }
        }
    });

    await client.record.create({
        data: {
            email: servant1.email,
            cname: 'Kazakhstan',
            disease_code: 'COVID-2019',
            total_deaths: 10,
            total_patients: 100,
        },
    });

    await client.record.create({
        data: {
            email: servant1.email,
            cname: 'Italy',
            disease_code: 'COVID-2019',
            total_deaths: 14,
            total_patients: 102,
        },
    });

    await client.record.create({
        data: {
            email: servant1.email,
            cname: 'Scotland',
            disease_code: 'COVID-2019',
            total_deaths: 101,
            total_patients: 1210,
        },
    });

    await client.record.create({
        data: {
            email: servant1.email,
            cname: 'United States',
            disease_code: 'COVID-2019',
            total_deaths: 101,
            total_patients: 1210,
        },
    });

    await client.record.create({
        data: {
            email: servant2.email,
            cname: 'Italy',
            disease_code: 'COVID-2019',
            total_deaths: 15,
            total_patients: 200,
        },
    });

    await client.record.create({
        data: {
            email: servant2.email,
            cname: 'Kazakhstan',
            disease_code: 'COVID-2019',
            total_deaths: 10,
            total_patients: 20,
        },
    });

    await client.record.create({
        data: {
            email: servant4.email,
            cname: 'Kazakhstan',
            disease_code: 'COVID-2019',
            total_deaths: 10,
            total_patients: 324023,
        },
    });

    await client.record.create({
        data: {
            email: servant3.email,
            cname: 'Italy',
            disease_code: 'COVID-2019',
            total_deaths: 15,
            total_patients: 123200,
        }
    });

    await client.record.create({
        data: {
            email: servant3.email,
            cname: 'Italy',
            disease_code: 'E11.65',
            total_deaths: 15,
            total_patients: 123200,
        }
    });

    await client.record.create({
        data: {
            email: servant3.email,
            cname: 'Kazakhstan',
            disease_code: 'A00.1',
            total_deaths: 15,
            total_patients: 12300,
        }
    });

    const DOCTORS = [
        {
            degree: 'PhD',
            specialize: diseaseDict.deficiency,
            user: {
                create: {
                    email: 'docs@example.com',
                    name: 'Marybek',
                    surname: 'Poghosyan',
                    salary: 4500,
                    phone: '+77770101123',
                    cname: 'Italy',
                }
            }
        },
        {
            degree: 'PhD',
            specialize: diseaseDict.virology,
            user: {
                create: {
                    email: 'any1@example.com',
                    name: 'Dadly',
                    surname: 'Turbo',
                    salary: 420,
                    phone: '+77770101100',
                    cname: 'Kazakhstan',
                }
            }
        },
        {
            degree: 'MD',
            specialize: diseaseDict.hereditary,
            user: {
                create: {
                    email: 'any2@example.com',
                    name: 'Max',
                    surname: 'Power',
                    salary: 121212,
                    phone: '+77770101101',
                    cname: 'United States',
                }
            }
        },
        {
            degree: 'MD',
            specialize: diseaseDict.physiological,
            user: {
                create: {
                    email: 'any3@example.com',
                    name: 'Mathew',
                    surname: 'Kane',
                    salary: 1000,
                    phone: '+77770101102',
                    cname: 'Italy',
                }
            }
        },
        {
            degree: 'PhD',
            specialize: diseaseDict.virology,
            user: {
                create: {
                    email: 'any4@example.com',
                    name: 'Elena',
                    surname: 'Ostapenko',
                    salary: 1000,
                    phone: '+77770101103',
                    cname: 'Kazakhstan',
                }
            }
        },
        {
            degree: 'PhD',
            specialize: diseaseDict.pathology,
            user: {
                create: {
                    email: 'any5@example.com',
                    name: 'Gulmira',
                    surname: 'Moore',
                    salary: 9000,
                    phone: '+7377010231',
                    cname: 'Italy',
                }
            }
        },
        {
            degree: 'PhD',
            specialize: diseaseDict.deficiency,
            user: {
                create: {
                    email: 'an65@example.com',
                    name: 'Walter',
                    surname: 'White',
                    salary: 12000,
                    phone: '+7377010231',
                    cname: 'Russia',
                }
            }
        },
    ];

    await Promise.all(DOCTORS.map(async (doctor) => {
        await client.users.create({ data: doctor.user.create });
        await client.doctor.create({
            data: {
                degree: doctor.degree,
                email: doctor.user.create.email,
            }
        });
        await client.specialize.create({
            data: {
                email: doctor.user.create.email,
                id: doctor.specialize,
            }
        })
    }));

    const PUBLIC_SERVANTS = [
        {
            department: 'Dept3',
            user: {
                create: {
                    email: 'eps1@domain.me',
                    name: 'Miko',
                    surname: 'Kali',
                    salary: 1200,
                    phone: '+77070303132',
                    cname: 'Kazakhstan',
                }
            }
        },
        {
            department: 'Dept3',
            user: {
                create: {
                    email: 'eps2@domain.me',
                    name: 'Sasha',
                    surname: 'Cohen',
                    salary: 1200,
                    phone: '+77070300222',
                    cname: 'Kazakhstan',
                }
            },
        },
        {
            department: 'Dept3',
            user: {
                create: {
                    email: 'eps3@domain.me',
                    name: 'Misha',
                    surname: 'Kali',
                    salary: 1200,
                    phone: '+77070303132',
                    cname: 'Kazakhstan',
                }
            }
        },
        {
            department: 'Dept3',
            user: {
                create: {
                    email: 'eps4@domain.me',
                    name: 'Dan',
                    surname: 'Abramov',
                    salary: 1200,
                    phone: '+77070302132',
                    cname: 'Kazakhstan',
                }
            }
        },
        {
            department: 'Dept3',
            user: {
                create: {
                    email: 'eps5@domain.me',
                    name: 'Theo',
                    surname: 'Jansen',
                    salary: 1200,
                    phone: '+77010300222',
                    cname: 'Kazakhstan',
                }
            },
        },
        {
            department: 'Dept3',
            user: {
                create: {
                    email: 'eps6@domain.me',
                    name: 'Dima',
                    surname: 'Petrov',
                    salary: 1200,
                    phone: '+77020303132',
                    cname: 'Kazakhstan',
                }
            }
        },
    ];

    await Promise.all(PUBLIC_SERVANTS.map(async (ps) => {
        await client.users.create({ data: ps.user.create });
        await client.publicServant.create({
            data: {
                department: ps.department,
                email: ps.user.create.email,
            }
        });
    }));


}

main();
