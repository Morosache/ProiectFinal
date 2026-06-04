import { vi } from "vitest";

process.env.JWT_SECRET = "test-jwt-secret";
process.env.JWT_REFRESH_SECRET = "test-refresh-secret";

const mockModel = () => ({
    findAll: vi.fn(),
    findOne: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
    count: vi.fn(),
    belongsTo: vi.fn(),
    hasMany: vi.fn(),
    hasOne: vi.fn(),
    belongsToMany: vi.fn(),
    sync: vi.fn(),
});

vi.mock("sequelize", () => ({
    Sequelize: vi.fn(() => ({
        define: vi.fn(mockModel),
        authenticate: vi.fn(),
        sync: vi.fn(),
        transaction: vi.fn(),
        query: vi.fn(),
        close: vi.fn(),
    })),
    DataTypes: {
        STRING: "STRING",
        TEXT: "TEXT",
        BOOLEAN: "BOOLEAN",
        INTEGER: "INTEGER",
        FLOAT: "FLOAT",
        DOUBLE: "DOUBLE",
        DATE: "DATE",
        DATEONLY: "DATEONLY",
        UUID: "UUID",
        UUIDV4: "UUIDV4",
        ENUM: vi.fn(),
    },
    Op: {},
}));
