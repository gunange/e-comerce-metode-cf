import type { RoleResource } from "./role";
import { pelangganResponse, type PelangganResource } from "./pelanggan";
import { userRegisterResponse } from "./user";

import { adminTokoResponse } from "./admin-toko";
import type { AdminTokoResource } from "./admin-toko";

export { userRegisterResponse, pelangganResponse, adminTokoResponse };

export type { PelangganResource, RoleResource, AdminTokoResource };
