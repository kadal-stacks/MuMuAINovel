"""Add per-user preferred interface language.

Revision ID: i18n_language_pg
Revises: 20260105_refinement
Create Date: 2026-11-19
"""
from alembic import op
import sqlalchemy as sa

revision = "i18n_language_pg"
down_revision = "20260105_refinement"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "preferred_language",
            sa.String(length=10),
            nullable=False,
            server_default=sa.text("'id'"),
            comment="User interface language preference",
        ),
    )


def downgrade() -> None:
    op.drop_column("users", "preferred_language")
