const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const generateDepartmentCode = async () => {
    const { nanoid } = await import('nanoid');
    let code;
    let exists = true;
    while (exists) {
        code = nanoid(10).toUpperCase(); // Generate a 10-character unique code
        const department = await prisma.department.findUnique({
            where: { departmentCode: code }
        });
        if (!department) {
            exists = false;
        }
    }
    return code;
};

const createUser = async (user) => { 
    console.log(user);
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return prisma.$transaction(async (prisma) => { 

        const newUser = await prisma.user.create({
            data: { 
                username: user.username, 
                password: hashedPassword, 
            }
        });

        return newUser; // Return newUser if needed
    });
};

const adminCreateUser = async (user) => {
    console.log(user);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            password: hashedPassword,
            departmentId: user.departmentId,
            hospitalId: user.hospitalId,
            image: user.image,
            departmentName: user.departmentName,
            isActive: true
        }
    });
};

const updateUser = async (id, user) => {
    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return prisma.user.update({
            where: {
                id: parseInt(id) // Assuming id is an integer
            },
            data: {
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                password: hashedPassword,
                departmentId: user.departmentId,
                hospitalId: user.hospitalId,
                image: user.image,
                isActive: true
            }
        });
    } else {
        return prisma.user.update({
            where: {
                id: parseInt(id) // Assuming id is an integer
            },
            data: {
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                departmentId: user.departmentId,
                hospitalId: user.hospitalId,
                image: user.image,
                isActive: true
            }
        });
    }
};

const findUserByUsername = async (username) => {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    });
};

const getUserByRole = async (data) => {
    return prisma.user.findMany({
        where: {
            role: data.role
        }
    });
};

const updateUserStatus = async (id, data) => {
    console.log(data)
    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)

        }
    })
    if (!user) {
        throw new Error('User not found');
    }
    return prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            isActive: data.isActive
        }
    });
};

const getUserByHospitalId = async (data) => {
    return prisma.user.findMany({
        where: {
            hospitalId: data.hospitalId,
            role: {
                notIn: ['admin', 'superadmin']
            }
        }
    });
};


module.exports = {
    createUser,
    findUserByUsername,
    getUserByRole,
    updateUser,
    getUserByHospitalId,
    updateUserStatus,
    adminCreateUser
};
